import { customRenderAlreadLogin ,screen,fireEvent } from './test-utils';
import '@testing-library/jest-dom'
import NewReply from '../fragments/NewReply';



test("Successful reply", async() =>{

    customRenderAlreadLogin(<NewReply post_id="1" replyTo_id={null}/>);

    const replyText = screen.getByRole('textbox');  //textbox input a
    const testReplyText = "Try to Reply something"
    fireEvent.change(replyText,{target:{value:testReplyText}});
    
    //check the blank has been fill
     expect(replyText.value).toBe("Try to Reply something");

});

