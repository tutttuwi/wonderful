// try to include fontawesome, but so huge...

const Checkbox = require('./Checkbox').Checkbox;

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
} else {
  console.log('test: production!!');
}
new Checkbox().init();

exports.Checkbox = Checkbox;
