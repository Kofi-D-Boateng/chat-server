const pool = require("../config/database");
const bcrypt = require("bcrypt");
const getLogin = async ({ email: email, password: password }) => {
  const db = await pool.connect();
  try {
    const LOGIN_QUERY = {
      text: "SELECT * FROM patient WHERE email = $1",
      values: [`${email}`],
    };
    const user = await db.query(LOGIN_QUERY);
    if (user.rowCount === 0) {
      return null;
    }
    const user_id = user.rows[0]["user_id"];
    const encryptedPassword = user.rows[0].password;
    const decrypt = await bcrypt.compare(password, encryptedPassword);

    if (!decrypt) {
      return null;
    }

    const getInfo = await getAppointment({ id: user_id, db: db });

    if (getInfo.length === 0 || getInfo === null) {
      return null;
    }

    const roomInfo = getInfo[3];

    const docInfo = await getDoctor({ id: roomInfo.doctor_id, db: db });
    if (docInfo.length === 0 || docInfo === null) {
      return null;
    }

    const user_first = user.rows[0].first_name;
    const user_last = user.rows[0].last_name;
    const apptTime = roomInfo.appt_time;
    const room_id = roomInfo.room_id;
    const injury = roomInfo.type_of_injury;
    const doc_first = docInfo[0].first_name;
    const doc_last = docInfo[0].last_name;
    const doc_title = docInfo[0].title;

    const data = {
      userFirst: user_first,
      userLast: user_last,
      injury: injury,
      docFirst: doc_first,
      docLast: doc_last,
      docTitle: doc_title,
      roomID: room_id,
      apptTime: apptTime,
    };
    db.release();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getAppointment = async ({ id: id, db: db }) => {
  const ROOM_QUERY = {
    text: "SELECT * FROM appointment WHERE patient_id = $1",
    values: [`${id}`],
  };
  try {
    const roomInfo = await db.query(ROOM_QUERY);
    return roomInfo.rows;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getDoctor = async ({ id: id, db: db }) => {
  const DOCTOR_QUERY = {
    text: "SELECT * FROM doctor WHERE user_id = $1",
    values: [`${id}`],
  };
  try {
    const doctor = await db.query(DOCTOR_QUERY);
    return doctor.rows;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = {
  getLogin,
};
