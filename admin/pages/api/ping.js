// /ping
// a basic ping api endpoint, for pinging purposes
// consider this the hello world for api endpoints..

export default async function handler(req, res) {
    await res.status(200).json({ ping: 'pong' });
}
