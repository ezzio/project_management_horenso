from common import utils as ut
from global_def import *

logger = ut.get_logger("task_random_id", level=logging.INFO)

class random_info:
    def __init__(self):
        self.id = None
        self.status = 0
        self.db_table_name = "random_id"
        self.col_id = "id"
        self.col_status = "status"

    def get_task_id(self, cnx, fname=""):
        task_id = -1
        try:
            _temp = -1
            cursor = cnx.cursor(buffered=True)
            query = "SELECT * FROM " + self.db_table_name + " WHERE {} = 0 limit 1".format(self.col_status)
            result = ut.emp_checkin_exec_query(cnx, query, fname)
            if len(result) == 1:
                _temp = result[0][self.col_id]
            if _temp > 0:
                qr_update = "UPDATE {} SET {} = 1 WHERE {} = \"{}\"".format(self.db_table_name, self.col_status, self.col_id, _temp)
                cursor.execute(qr_update)
                cnx.commit()
                task_id = _temp
        except Exception as e:
            logger.info("{}: {}".format(fname, e))
        return task_id



