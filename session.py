from flask import jsonify, request
from firebase_admin import db
from firebase_admin import auth
import datetime
import time
import flask
def getToken():
    product = request.get_json()
    id_token = flask.request.json['idToken']
    decoded_claims = auth.verify_id_token(id_token)
    expires_in = datetime.timedelta(days=5)
    try:
        if time.time() - decoded_claims['auth_time'] < 5 * 60:
            session_cookie = auth.create_session_cookie(
                id_token, expires_in=expires_in)
            response = flask.jsonify({'status': 'success'})
            expires = datetime.datetime.now() + expires_in
            response.set_cookie(
                'session', session_cookie, expires=expires, httponly=True, secure=True)
            return response
    except:
        return flask.abort(401, 'Failed to create a session cookie')


def getSessionCookies():
    session_cookie = flask.request.cookies.get('session')
    if not session_cookie:
        return flask.redirect('/login.html')
    try:
        decoded_claims = auth.verify_session_cookie(
            session_cookie, check_revoked=True)
        return (decoded_claims)
    except auth.InvalidSessionCookieError:
        return flask.redirect('/login')
