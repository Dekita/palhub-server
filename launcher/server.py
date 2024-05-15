#!/usr/bin/env python3
########################################
# PalHUB::Server by dekitarpg@gmail.com
########################################

from http.server import BaseHTTPRequestHandler, HTTPServer
import subprocess
import json
import time
import os

PORT_NUMBER = 8080

# Define shell scripts based on the command
# Add more commands and corresponding scripts here
SCRIPT_MAPPINGS = {
    'shutdown': 'run-shutdown.sh',
    'restart': 'run-restart.sh',
    'update': 'run-updater.sh',
}

class CoreFunctionServerHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        print(f"do_GET")

        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        
        # Send the HTML response
        response = "<html><body><h1>Hello, this is a basic GET handler!</h1></body></html>"
        self.wfile.write(response.encode('utf-8'))

    def do_POST(self):
        content_len = int(self.headers.get('Content-Length'))
        post_body = self.rfile.read(content_len)
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        data = json.loads(post_body)

        # Get the command from the received data
        command = data.get('cmd', '')
        bReturn = data.get('return', False)
        print(f"Attempting process core function cmd: {command} [{bReturn}]")

        # Check if the command has a corresponding script
        if command in SCRIPT_MAPPINGS:
            script = SCRIPT_MAPPINGS[command]
            cmd = f"./launcher/{script}"  # Assuming scripts are in the same directory as the Python script
            if bReturn:
                # If bReturn is True, capture the script output
                p = subprocess.Popen(cmd, stdout=subprocess.PIPE, shell=True)
                p_status = p.wait()
                (output, err) = p.communicate()
                response_data = {
                    'message': f"Script executed: {script}",
                    'output': output.decode('utf-8'),
                    'exit_status': p_status
                }
            else:
                # If bReturn is False, just launch the script
                subprocess.Popen(cmd, shell=True)
                response_data = {'message': f"Script launched: {script}"}
        else:
            response_data = {'error': 'Invalid command'}

        # Encode response data as JSON and send it
        response_json = json.dumps(response_data)
        self.wfile.write(response_json.encode('utf-8'))            



def find_and_kill_process(port):
    try:
        # Find the process ID (PID) using the specified port
        result = subprocess.run(['lsof', '-i', f':{port}', '-t'], capture_output=True, text=True)
        pid = result.stdout.strip()

        if pid:
            # Kill the process using the obtained PID
            subprocess.run(['kill', '-9', pid])
            print(f"Process using port {port} (PID {pid}) killed.")
        else:
            print(f"No process found using port {port}.")
    except Exception as e:
        print(f"Error: {e}")


# Check if the port is in use and kill the process if needed
find_and_kill_process(PORT_NUMBER)
time.sleep(0.1)  # Introduce a short delay to allow for pid kill

# Retry starting the server until the port is successfully bound
while True:
    try:
        server = HTTPServer(('0.0.0.0', PORT_NUMBER), CoreFunctionServerHandler)
        print('Started httpserver on port', PORT_NUMBER)
        server.serve_forever()
    except OSError as e:
        if "Address already in use" in str(e):
            print(f"Port {PORT_NUMBER} is still in use. Retrying in 1 second...")
            time.sleep(1)
        else:
            print(f"Unexpected error: {e}")
            break
    except KeyboardInterrupt:
        print('^C received, shutting down the web server')
        server.socket.close()
        break
