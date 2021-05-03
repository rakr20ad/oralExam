class Like {
    constructor(req) {
        this.id = req.body.id,
        this.sender_id = req.body.sender_id,
        this.receiver_id = req.body.receiver_id
    }
}

module.exports = Like