const root = document.querySelector('html')

const cursor = document.createElement('span')
cursor.classList.add('cursor')
root.appendChild(cursor)

const follower = document.createElement('span')
follower.classList.add('cursor', 'cursor__follower')
root.appendChild(follower)

root.addEventListener('mousemove', (e) => {
  setPositionOfFollower(follower, e)
  setPosition(cursor, e)
})

function setPosition(element, e) {
  element.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
}

function setPositionOfFollower(element, e) {
  element.style.transform = `translate3d(${e.clientX + 6}px, ${
    e.clientY + 6
  }px, 0)`
}
