import { customRenderAlreadLogin ,screen,fireEvent ,} from './test-utils';
import '@testing-library/jest-dom'
import NewPost from '../fragments/NewPost';



test("Successful post", async() =>{
    customRenderAlreadLogin(<NewPost/>)

    const enterText = screen.getByRole('textbox');  //textbox input a
    const testText = "Try to Enter something"
    fireEvent.change(enterText,{target:{value:testText}});

//check the blank has been fill
     expect(enterText.value).toBe("Try to Enter something");

});



