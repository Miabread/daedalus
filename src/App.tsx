import { Component } from 'solid-js';
import { setHasSaved, setText, text, useFileMenu } from './fileMenu';

const App: Component = () => {
    useFileMenu();

    return (
        <div class="flex flex-col bg-slate-700 h-screen w-screen justify-center items-center">
            <textarea
                onInput={(e) => {
                    setText(e.currentTarget.value);
                    setHasSaved(false);
                }}
                value={text()}
            ></textarea>
        </div>
    );
};

export default App;
