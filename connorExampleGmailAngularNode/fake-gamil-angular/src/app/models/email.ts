export class Email {
    sender: string;
    recipient: string;
    subject: string;
    body: string;
    timeStamp: string;

    constructor(
        sender: string,
        recipient: string,
        subject: string,
        body: string,
        timeStamp: string){
            this.sender = sender;
            this.recipient = recipient;
            this.subject = subject;
            this.body = body;
            this.timeStamp = timeStamp;
        }
}
