var env = process.env.NODE_ENV || 'development';
console.log('env *****', env);
if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://myadmin:noblecooleyy@ds119223.mlab.com:19223/todoapp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://myadmin:noblecooleyy@ds119223.mlab.com:19223/TodoAppTest';
}else {
    process.env.MONGODB_URI =  'mongodb://myadmin:noblecooleyy@ds119223.mlab.com:19223/todoapp';
}
