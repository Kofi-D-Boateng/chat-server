"use strict";
import pg from "pg";

const Pool = pg.Pool;

const pool = new Pool({});

export default pool;
