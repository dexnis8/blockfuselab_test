const db = require("../db");

class Conversation {
  static saveConversation = async (payload, callback) => {
    const sql =
      "INSERT INTO chat_rooms (sender_id, receiver_id, room_id, client_details, merchant_details) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id";

    db.query(
      sql,
      [
        payload.senderId,
        payload.receiverId,
        payload.roomId,
        payload.client_details,
        payload.merchant_details,
      ],
      (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
      }
    );
  };
  static saveMessage = async (payload, callback) => {
    const sql =
      "INSERT INTO chat_messages (sender_id, receiver_id, room_id, message) VALUES (?, ?, ?, ?)";

    db.query(
      sql,
      [payload.senderId, payload.receiverId, payload.roomId, payload.message],
      (err, result) => {
        if (err) callback(err, null);

        callback(null, result);
      }
    );
  };

  static getMessages = async (senderId, receiverId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM chat_messages WHERE (sender_id = ? AND receiver_id = ?) OR (receiver_id = ? AND sender_id = ?) ORDER BY created_at ASC",
        [senderId, receiverId, senderId, receiverId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  };
  static findById = async (id, callback) => {
    const sql = "SELECT * FROM messages WHERE room_id = ? ";
    db.query(sql, [id], (err, result) => {
      if (err) {
        callback(err, null);
      }
      console.log(result);
      callback(null, result);
    });
  };
  static getRoom = async (senderId, receiverId) => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT * FROM chat_rooms WHERE (sender_id = ? AND receiver_id = ?) OR (receiver_id = ? AND sender_id = ?)";
      db.query(
        sql,
        [senderId, receiverId, senderId, receiverId],
        (error, result) => {
          if (error) {
            return reject(error);
          }
          // console.log(result);
          resolve(result);
        }
      );
    });
  };

  static findById = async (id, callback) => {
    const sql = "SELECT * FROM messages WHERE room_id = ? ";
    db.query(sql, [id], (err, result) => {
      if (err) {
        callback(err, null);
      }
      console.log(result);
      callback(null, result);
    });
  };

  static getClientChats(userId, callback) {
    const sql = `
      SELECT DISTINCT merchant_details 
      FROM chat_rooms 
      WHERE sender_id = ? OR receiver_id = ?
    `;
    db.query(sql, [userId, userId], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  }

  static getMerchantChats(merchantId, callback) {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT DISTINCT room_id, client_details 
      FROM chat_rooms 
      WHERE sender_id = ? OR receiver_id = ?
    `;
      db.query(sql, [merchantId, merchantId], (error, result) => {
        if (error) {
          return reject(error);
        }
        console.log(result);
        resolve(result);
        // const data = result.map(
        //   (details) =>
        //     new Promise((resolve, reject) => {
        //       db.query(
        //         `SELECT DISTINCT room_id FROM chat_messages WHERE room_id = ?`,
        //         [details.room_id], // Use parameterized query to avoid SQL injection
        //         (err, result) => {
        //           if (err) {
        //             console.log("Error mapping getting property details ");
        //             reject(err);
        //           }
        //           console.log(result);
        //           if (result.length > 0) {
        //             try {
        //               resolve(JSON.parse(details.client_details));
        //             } catch (parseError) {
        //               reject(parseError);
        //             }
        //           } else {
        //             resolve(null);
        //           }
        //         }
        //       );
        //     })
        // );
        // Promise.all(data)
        //   .then((resolvedData) => {
        //     resolve(resolvedData.filter((item) => item !== null)); // Filter out null values
        //   })
        //   .catch((err) => {
        //     reject(err);
        //   });
      });
    });
  }
}

module.exports = Conversation;
