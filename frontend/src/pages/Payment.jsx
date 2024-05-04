import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Payment() {
    const navigate = useNavigate()
    const KEY = "pk_test_51N0keaDZdJfh6NokVL50996j6dbLaIs0eTsbpoisJVx3EduUoqAFJLuTcCblv3gePm1ofzpNICcFDSVLxItrqyjT0089ZUzIhe"
    const [stripeToken, setStripeToken] = useState("")

    const onToken = (token) => {
        setStripeToken(token)
    }

    useEffect(() => {
        const makeRequest = async () => {
            const response = await fetch("http://localhost:8080/api/checkout/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: 2000,
                    tokenId: stripeToken.id
                })
            })

            console.log(response)

            const data = await response.json()
            console.log(data)
            navigate("/success")
            console.log(data)
        }

        stripeToken && makeRequest()
    }, [stripeToken])

    return (
        <div className="flex justify-center items-center h-screen">
            {stripeToken ? <span>Processing</span> :
                <StripeCheckout
                    name="Aldo"
                    image="https://www.aldocoppola.com/wp-content/uploads/2019/06/aldo-coppola-logo.png"
                    billingAddress={true}
                    shippingAddress={true}
                    description="Your total is $20"
                    amount={2000}
                    token={onToken}
                    stripeKey={KEY}
                >
                    <button className="bg-black text-white px-4 py-2 rounded    ">Pay</button>
                </StripeCheckout>
            }
        </div>
    )
}
