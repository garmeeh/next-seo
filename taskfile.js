export async function compile(task) {
  await task.parallel(['src']);
}

export async function src(task, opts) {
  await task
    .source(
      opts.src || [
        'src/**/*.+(js|jsx|ts|tsx)',
        '!src/**/*.spec.+(js|jsx|ts|tsx)',
        '!src/**/*.snap',
      ],
    )
    .babel({
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-transform-react-jsx',
      ],
    })
    .target('./dist', { mode: '0755' });
}

export async function build(task) {
  await task.serial(['compile']);
}

export default async function(task) {
  await task.clear('dist');
  await task.start('build');
  await task.watch('src/*.+(js|jsx|ts|tsx)', 'src');
}

export async function release(task) {
  await task.clear('dist').start('build');
}
