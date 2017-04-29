export async function getUserInfo(ctx, next) {
  try {
    ctx.body = 'userinfo'
  } catch (e) {
    logger.log('error', e)
  }
}
