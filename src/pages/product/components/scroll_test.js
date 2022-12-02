// import React from 'react'
// import { useScrollPosition } from '@n8tb1t/use-scroll-position'
// import { useRef, useState } from 'react'
// import { useEffect } from 'react'
// export default function ScrollTest({ setHowLongCard, howLongCard }) {
//   const PositionStore = () => {
//     const [renderCount, triggerReRender] = useState(0)
//     const elementPosition = useRef({ x: 10, y: 150 })
//     const viewportPosition = useRef({ x: 0, y: 0 })
//     let throttleTimeout = null

//     const getPos = (el, axis) => Math.round(el.current[axis])

//     const setPos = (el, pos) => {
//       el.current = pos
//       if (throttleTimeout !== null) return
//       // Only re-render the component every 0.1s
//       throttleTimeout = setTimeout(() => triggerReRender(renderCount + 1), 300)
//     }

//     return {
//       getElementX: () => getPos(elementPosition, 'x'),
//       getElementY: () => getPos(elementPosition, 'y'),
//       getViewportX: () => getPos(viewportPosition, 'x'),
//       getViewportY: () => getPos(viewportPosition, 'y'),
//       setElementPosition: (pos) => setPos(elementPosition, pos),
//       setViewportPosition: (pos) => setPos(viewportPosition, pos),
//       renderCount,
//     }
//   }

//   const positionsStore = PositionStore()
//   const viewportRef = useRef()
//   const redBoxRef = useRef()

//   // Viewport scroll position
//   useScrollPosition(
//     ({ currPos }) => {
//       positionsStore.setViewportPosition(currPos)
//     },
//     [positionsStore],
//     null,
//     true
//   )

//   // Element scroll position
//   useScrollPosition(
//     ({ currPos }) => positionsStore.setElementPosition(currPos),
//     [],
//     redBoxRef,
//     false,
//     300
//   )

//   useEffect(() => {
//     console.log(positionsStore.getElementY())
//   }, [])
//   return (
//     <div ref={redBoxRef}>
//       {positionsStore.getElementY() <= 700 &&
//       positionsStore.getElementY() >= 650
//         ? setHowLongCard(howLongCard + 16)
//         : ''}
//     </div>
//   )
// }
