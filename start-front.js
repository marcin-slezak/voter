const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'voter-front', shell: true };
require('child_process').spawn('npm', args, opts);