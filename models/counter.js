import logger from '../common/logger'

export async function nextSeq(name, db) {
  try {
    const collection = db.collection('counter')
    const result = await collection.findOneAndUpdate({ name },
      { $inc: { seq: 1 } },
      { returnOriginal: false, upsert: true })
    if (result.ok === 1 && result.value.seq) {
      return result.value.seq
    }
    throw new Error(`mongo_counter_seq_error:${result.ok} ${result.value}`)
  } catch (e) {
    logger.log('error', e)
    throw e
  }
}
