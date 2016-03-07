

module.exports = function(mongoose){

  var Schema = mongoose.Schema;

  var menuSchema = new Schema({
    menu_id   : { type : Number , required : true , unique : true },
    parent_id : { type : Number },
    level     : { type : Number },
    menu_ne   : { type : String },
    auth      : { type : String },
    url       : { type : String },
    reg_dt    : { type : Date , default : Date.now() }
  });
  mongoose.model('menu', menuSchema);

  var categorySchema = new Schema({
    category_no : { type : Number , required : true , unique : true },
    category_ne : { type : String , required : true },
    auth        : { type : String },
    reg_dt      : { type : Date , default : Date.now() }
  });
  mongoose.model('category', categorySchema);

  var authSchema = new Schema({
    auth    : { type : String , required : true , unique : true },
    auth_ne : { type : String , required : true},
    reg_dt  : { type : Date , default : Date.now() }
  });
  mongoose.model('auth', authSchema);

  var postSchema = new Schema({
    post_no      :  { type : Number , required : true , unique : true},
    category_no  :  { type : Number , required : true },
    title        :  { type : String , required : true},
    content      :  { type : String },
    read_cnt     :  { type : Number },
    reg_mail     :  { type : String , required : true },
    reg_dt       :  { type : Date , default : Date.now() }
  });
  mongoose.model('post', postSchema);

  var userSchema = new Schema({
    usr_email : { type : String , required : true , unique : true },
    usr_pwd   : { type : String , required : true },
    usr_ne    : { type : String },
    auth      : { type : String },
    reg_dt    : { type : Date , default : Date.now() }
  });
  userSchema.methods.validPassword = function( pwd ) {
    // EXAMPLE CODE!
    return ( this.usr_pwd === pwd );
};

  mongoose.model('user', userSchema);

  var fileSchema = new Schema({
    file_no   : { type : Number , required : true , unique : true},
    post_no   : { type : Number , required : true },
    file_ne   : { type : Number , required : true },
    file_ext  : { type : Number , required : true },
    file_path : { type : Number , required : true },
    reg_mail  : { type : String },
    reg_dt    : { type : Date , default : Date.now() }
  });
  mongoose.model('file', postSchema);

  var reviewSchema = new Schema({
    review_no : { type : Number , required : true , unique : true },
    content   : { type : String },
    reg_mail  : { type : String },
    reg_dt    : { type : Date , default : Date.now() }
  });
  mongoose.model('review', reviewSchema);

  var logSchema = new Schema({
    access_path : { type : String },
    ip          : { type : String },
    access_date : { type : Date , default : Date.now() }
  });
  mongoose.model('log', logSchema);

};
