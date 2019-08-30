import React, { useRef, useCallback } from 'react'
import { observable, autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
const { width, height } = $device.info.screen
const TodoItemHeight = 50
const TodoItemMargin = 5

const styles = {
  container: $rect(0, 0, width, width),
  scroll: $rect(0, 50, width, width - 50),
  input: $rect(5, 8, width - 60, 35),
  button: $rect(width - 50, 8, 45, 35),
  getLabelFrame: index => $rect(0, index * (TodoItemHeight + TodoItemMargin), width, TodoItemHeight),
  getScrollContentSize: itemNum => $size(width, itemNum * (TodoItemHeight + TodoItemMargin))
}

const todoList = observable(new Map())
autorun(() => {
  const size = todoList.size
  const scroll = $('scroll')
  if (!scroll) return
  scroll.contentSize = styles.getScrollContentSize(size)
  $audio.play({ id: 1104 })
})

function MobxExample() {
  const inputRef = useRef()
  const addTodo = useCallback(() => {
    if (inputRef.current.text === '') return
    todoList.set(inputRef.current.text, false)
    inputRef.current.text = ''
  }, [])
  const toggleTodo = useCallback(todo => {
    todoList.set(todo, !todoList.get(todo))
  }, [])
  const deleteTodo = name => todoList.has(name) && todoList.delete(name)

  return (
    <view frame={styles.container}>
      <input frame={styles.input} ref={inputRef} placeholder="Input todo item" />
      <button
        frame={styles.button}
        title="Add"
        events={{
          tapped: addTodo
        }}
      />
      <scroll frame={styles.scroll} id="scroll" contentSize={styles.getScrollContentSize(todoList.size)}>
        {Array.from(todoList).map(([todo, done], index) => (
          <label
            frame={styles.getLabelFrame(index)}
            key={todo}
            text={`${done ? ' ✔' : ' ⏲'}  ${todo}`}
            bgcolor={$color('#EAD0B3')}
            events={{
              tapped: () => toggleTodo(todo),
              longPressed: () => deleteTodo(todo)
            }}
          />
        ))}
      </scroll>
    </view>
  )
}

export default observer(MobxExample)
