import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import * as crypto from 'crypto-js';


const base64Url = (str) => {
    return str.toString(enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  };
  
  const generateCodeVerifier = () => {
    const codeVerifier = base64Url(enc.Base64.stringify(WordArray.random(32)));
    return codeVerifier;
  };
  
  const generateCodeChallenge = (codeVerifier) => {
    const codeChallenge = base64Url(sha256(codeVerifier));
    return codeChallenge;
  };
  
  export {
    base64Url,
    generateCodeVerifier,
    generateCodeChallenge
  };