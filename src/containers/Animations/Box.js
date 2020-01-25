import React , {useState , useEffect} from 'react';
import posed from 'react-pose';
import './style.css'


const Box = posed.div({
    left: { x: -100 },
    right: { x: 400 }
})

const Example = () => {
    const [isVisible , setIsVisble] = useState(true)
    useEffect(() => {
         setTimeout(() => {
             setIsVisble(!isVisible)
         }, 500);
   }, [isVisible])

   return <div>
       <Box  className="box" pose={isVisible ? 'left' : 'right'} />
       </div>

}

export default Example