import React from 'react'

export default function index(props) {
    const {obj,activeOptionId,onTabChange}=props
    const isactive= obj.id === activeOptionId ? 'active-tab' :'';
    const onTab=()=>{
        onTabChange(obj.id)
    }
  return (
    <li>
        <button onClick={onTab} className={isactive}>
           {obj.display_text}
        </button>
        
    </li>
  )
}
