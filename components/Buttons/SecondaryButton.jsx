import React from 'react'
import { motion } from 'framer-motion'

const SecondaryButton = ({ children, ...props }) => {
    return (
        <motion.button
            whileHover={{
                y: -10,
            }}
            className={`bg-text-dark button-utils ${
                props.large ? 'py-5 px-7 text-xl w-[170px]' : ''
            }`}
            {...props}
        >
            {children}
        </motion.button>
    )
}

export default SecondaryButton
