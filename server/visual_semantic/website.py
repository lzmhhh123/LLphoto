#!/usr/bin/env python2
from flask import Flask, request, session, g, jsonify
from werkzeug.utils import secure_filename

import MySQLdb as pymysql

import json
import hashlib


app = Flask(__name__)
UPLOAD_FOLDER = './img'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

db = pymysql.connect(
    host='127.0.0.1', port=3306, passwd="salami1997",
    user='root', db='mobile_pj', charset='utf8')

import semantics # image regconition
topk = 2 # get top2 sentences

username = 'lulitao1997'

@app.before_request
def before_request():
    # g.username = session.get('username', None)
    g.username = username # TODO: user control
    g.url_path = request.path

@app.route('/register', methods=['POST'])
def register_user():
    try:
        if g.username is not None:
            db_utils.save_photo()
        else:
            return {"error":"not login"}
    except Exception as e:
        return {"error":"unknown"}

@app.route('/login', methods=['POST'])
def login_post():
    # username = request.form['username']
    # password = request.form['password']
    # print("username:%s, password:%s" % (username, password))
    # # return str(request.form)
    # cursor = db.cursor()
    # cursor.execute('select uid, password from users where uid=%s', [id])
    # result = cursor.fetchall()
    # # if len(result)==0 or hash(id+psw)!=result[0][1]: # TODO: change to hash
    # #     return {"error":"username and password unmatched"}
    # if len(result) == 0 or psw != result[0][1]: #TODO: change to hash
    #     return {"error":"username and password unmatched"}
    # name = result[0][2]
    # session['id'] = result[0][0]
    # session['name'] = name
    return 1

UPLOAD_FOLDER = './img'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

import base64

def decode_base64(data):
    """Decode base64, padding being optional.

    :param data: Base64 data as an ASCII byte string
    :returns: The decoded byte string.

    """
    missing_padding = len(data) % 4
    if missing_padding != 0:
        data += b'='* (4 - missing_padding)
    return base64.decodestring(data)

from hash2des import hash2des

@app.route('/upload', methods=['POST'])
def receive_img():
    # # check if the post request has the file part
    # if 'file' not in request.files:
    #     return {"error":"no file part"}
    # file = request.files['file']
    # # if user does not select file, browser also
    # # submit a empty part without filename
    # if file.filename == '':
    #     return {"error":"No selected file"}
    #
    # if file:
    #     if file and allowed_file(file.filename):
    #         ans = semantics.get_tags(file.filename)
    #         filename = secure_filename(file.filename)
    #         savepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    #         file.save(savepath)
    #         img_info = semantics.get_tags(savepath, filename)
    #
    #         cursor = db.cursor()
    #         cursor.execute('insert into images values(%s, %s, %s, %s)',
    #             [g.username, filename, str(ans['tags']), str(ans['sentences'])])
    #         db.commit()
    #     # filename = secure_filename(file.filename)
    #     # file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    # print str(request)
    # print str(request.data)
    # print str(reqeust.body)

    # try:
    base64_img = json.loads(request.data)['data']
    # print str(base64_img)
    img_hash = hashlib.sha1(base64_img).hexdigest()
    print img_hash

    # with db.cursor() as cursor:
    cursor = db.cursor()
    cursor.execute('select tags, sentence from images where img_hash=%s', [img_hash])
    result = cursor.fetchall()
    if len(result) != 0:
        ans = {}
        ans['tags'] = eval(result[0][0])
        if img_hash in hash2des:
            ans['tags'] = semantics.extract_nouns(hash2des[img_hash])
        ans['sentence'] = eval(result[0][1])
        print jsonify(ans)
        return jsonify(ans)
    cursor.close()

    with open("./img/%s.jpg" % img_hash, "wb") as fh:
        fh.write(decode_base64(base64_img))

    ans = semantics.get_tags("./img/%s.jpg" % img_hash)
    if img_hash in hash2des:
        ans['tags'] = semantics.extract_nouns(hash2des[img_hash])

    # with db.cursor() as cursor:
    cursor = db.cursor()
    cursor.execute('insert into images values(%s, %s, %s, %s)',
        [g.username, img_hash, str(ans['tags']), str(ans['sentence'])])
    db.commit()
    cursor.close()

    print str(jsonify(ans))
    return jsonify(ans)
    # except Exception as e:
    #     return jsonify({"error":"unknown"})


@app.route('/download', methods=['GET'])
def download_img():
    pass


if __name__ == '__main__':
    app.run(host='0.0.0.0')
