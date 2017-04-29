import { MongoClient } from 'mongodb'
import _ from 'lodash'
import { nextSeq } from './counter'
import { mongoUrl, mongoOpt } from '../config'
import logger from '../common/logger'

// mongo connect
function connect() {
  return MongoClient.connect(mongoUrl, mongoOpt)
}

export async function insertOrUpdate(doc, conn) {
  let db = null
  try {
    db = conn || await connect() // use outside connection
    const collection = db.collection('diary')
    // find and update, at first
    const diary = _.clone(doc)
    diary.updatedAt = new Date()
    let result = await collection.updateOne(_.pick(diary, ['userId', 'day']), { $set: doc })
    logger.log('debug', 'update diary result: %j', result)

    if (result.matchedCount === 1) {
      return diary
    } else if (result.matchedCount === 0) {
      // insert new one
      diary.updatedAt = diary.createdAt = new Date()
      diary.id = await nextSeq('diary', db)  // generate increased id
      result = await collection.insertOne(diary)
      logger.log('debug', 'insert diary result: %j', result)

      if (result.insertedCount === 1) {
        return diary
      }
    }
    throw new Error(`diary_update_error: ${result}`)
  } catch (e) {
    logger.log('error', 'update diary, userid: %s , day: %s', diary.userid, diary.day)
    throw e
  } finally {
    conn || (db && db.close())
  }
}

export async function findListByUserIdAndDate(userId, month, conn) {
  let db = null
  try {
    db = conn || await connect() // use outside connection
    const collection = db.collection('diary')
    const docs = await collection
      .find({ userId, day: { $regex: month } }, { day: 1})
      .limit(31).sort({day: 1})
      .toArray()
    logger.log('debug', 'find diary list: %j', docs)
    return docs
  } catch (e) {
    logger.log('error', 'find diary list, userid: %s , month: %s', userid, month)
    throw e
  } finally {
    conn || (db && db.close())
  }
}

export async function findOneByUserIdAndDate(userId, day, conn) {
  let db = null
  try {
    db = conn || await connect() // use outside connection
    const collection = db.collection('diary')
    const doc = await collection.findOne({ userId, day })
    logger.log('debug', 'find diary: %j', doc)
    return doc
  } catch (e) {
    logger.log('error', 'find diary, userid: %s , day: %s', userId, day)
    throw e
  } finally {
    conn || (db && db.close())
  }
}
