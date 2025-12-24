import { Link, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-base-100 text-center space-y-5">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg" alt="404" className="w-96 rounded-lg shadow-2xl" />
            </motion.div>

            <h1 className="text-4xl font-bold">Oops!</h1>
            <p className="text-xl">Sorry, an unexpected error has occurred.</p>
            <p className="font-mono text-error">
                <i>{error.statusText || error.message}</i>
            </p>
            <Link to="/" className="btn btn-primary">Go Back Home</Link>
        </div>
    );
};

export default ErrorPage;
