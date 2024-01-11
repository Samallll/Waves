const authorize = () => {

    const codeChallenge = '7KsB5rHCPcsHLxs3eijds83BQHc0yUMku227l516UUE';

    return `http://127.0.0.1:8000/oauth2/authorize?response_type=code&client_id=client1&redirect_uri=http://127.0.0.1:3000/authorized&scope=openid read&code_challenge=${codeChallenge}&code_challenge_method=S256` 
}

export default authorize;