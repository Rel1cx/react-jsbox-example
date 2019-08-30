import React from 'react'
import { observable, autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
const { width, height } = $device.info.screen
const TodoItemHeight = 50
const TodoItemMargin = 5

const todoList = observable(new Map())

autorun(() => {
    const size = todoList.size
    const scroll = $('scroll')
    if (!scroll) return
    scroll.contentSize = $size(width, size * (TodoItemHeight + TodoItemMargin))
    $audio.play({ id: 1104 })
})

function MobxExample() {
    const inputRef = React.useRef()
    const addTodo = React.useCallback(() => {
        if (inputRef.current.text === '') return
        todoList.set(inputRef.current.text, false)
        inputRef.current.text = ''
    }, [])
    const toggleTodo = React.useCallback(todo => {
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
            <scroll frame={styles.scroll} id="scroll">
                {Array.from(todoList).map(([todo, done], index) => (
                    <label
                        frame={$rect(0, index * (TodoItemHeight + TodoItemMargin), width, TodoItemHeight)}
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

const styles = {
    container: $rect(0, 0, width, width),
    scroll: $rect(0, 50, width, width - 50),
    input: $rect(5, 8, width - 60, 35),
    button: $rect(width - 50, 8, 45, 35)
}

export default observer(MobxExample)
