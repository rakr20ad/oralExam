class Dislike {
    constructor(req) {
        this.id = req.body.id,
        this.dislikeSender_id = req.body.dislikeSender_id,
        this.dislikeReceiver_id = req.body.dislikeReceiver_id
    }
}

module.exports = Dislike