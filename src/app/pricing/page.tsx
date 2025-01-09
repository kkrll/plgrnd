'use client'

import { useState } from 'react'
import styles from './styles.module.css'

const PriceItem = ({ active, setActive, term }: {
    active: boolean
    setActive: () => void
    term: number
}) => {
    return (
        <button onClick={setActive} className={active ? styles.PriceItemWrapperActive : styles.PriceItemWrapperPassive}>
            <div className={styles.row}>
                <input type="radio" checked={active} onChange={()=>{}}/>
                <label ><h4>{term}-MONTH PLAN</h4>
                    <p>$7.99</p></label>
            </div>
            <div style={{
                opacity: active ? '1' : '0',
                maxHeight: active ? '136px' : '0px',
                overflow: active ? 'visible' : 'hidden',
                // transition: !active ? 'height 0.2s ease-out 0.1s, opacity 0.1s ease' : 'height 0.1s ease-out , opacity 0.2s ease 0.2s'
                transition: 'max-height 0.2s ease-out 0.15s, opacity 0.15s ease'

            }}>
<div className={styles.stack}>
                <p><span style={{fontSize: '12px', lineHeight: '18px'}}>✔</span> Personalized plan</p>
                <p><span style={{fontSize: '12px', lineHeight: '18px'}}>✔</span> AI Fitness Coach</p>
                <p><span style={{fontSize: '12px', lineHeight: '18px'}}>{term !== 1 ? "✔" : "✕"}</span> Explicit guide for gym-goers</p>
                <p><span style={{fontSize: '12px', lineHeight: '18px'}}>{term !== 12 ? "✕" : "✔"}</span> Zing Lab AI</p>
                </div>

            </div>
        </button>
    )
}

const TestPage = () => {
    const [activeItem, setActiveItem] = useState(3)

    return (
        <div className={styles.wrapper}>
            <div className={styles.stack}>
                <PriceItem setActive={() => setActiveItem(1)} active={activeItem === 1 } term={1}/>
                <PriceItem setActive={() => setActiveItem(2)} active={activeItem === 2 } term={3}/>
                <PriceItem setActive={() => setActiveItem(3)} active={activeItem === 3} term={12}/>
            </div>
        </div>
    )
}

export default TestPage