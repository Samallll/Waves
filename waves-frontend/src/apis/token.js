const token = () => {

    const code = sessionStorage.getItem('code');
    const codeVerifier = 'm1vPAe8FO_w2GMSIyxr-NtTdAF8e2b_475XMF3Q1pIEWCC1LmaO2LWdzurW-MA46wfZcqkBsqmo257XYgeP-1KXjoElxMl7dHJ-d4iCqouR1QJ4Do40xaT1JKOz8KWe5'
    const clientId = 'client1'
    const grantType = 'authorization_code';

    return `http://localhost:8000/oauth2/token?client_id=${clientId}&grant_type=${grantType}&redirect_uri=http://127.0.0.1:3000/authorized&code_verifier=${codeVerifier}&code=${code}`
}

export default token;