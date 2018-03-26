export class User {
    constructor(
        public _id:String = "",
        public first_name:String = "",
        public last_name:String = "",
        public email:String = "",
        public editable:Boolean = false
    ){}
}
