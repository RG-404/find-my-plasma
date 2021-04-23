import Firebase from '../components/Firebase'

const verify = () => {

    const handleClick = () => {
        console.log("CLICK");
        const recaptcha = new Firebase.auth.RecaptchaVerifier('recaptcha');
        const number = '+918811994019'
        Firebase.auth().signInWithPhoneNumber(number, recaptcha).then((e)=>{
            const code = prompt("OTP", "");
            if(code==null)return
            e.confirm(code).then((result)=>{
                console.log(result.user, 'user');
                document.que
            })

        }).catch((error)=>{
            console.log(error);
        })

    }

    return (
        <div>
            <button onClick={handleClick}>verify</button>
            <div id="recaptcha"></div>
        </div>
    )
}

export default verify
