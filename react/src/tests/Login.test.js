import { customRender ,screen,fireEvent , waitFor} from'./test-utils';
import Login from "../pages/Login";
import {setupServer} from 'msw/node'
import {rest} from 'msw'
import '@testing-library/jest-dom'

const server = setupServer(
    rest.get('http://localhost:4000/api/users/login',(req,res,ctx) =>{
        return res(ctx.json(
            {
                user_id: 16,
                user_name:"testName",
                user_email:"testEmail@gmail.com",
                user_password:"testPassword",
            }
            
        ))
    })

);

const server2 = setupServer(
    rest.get('http://localhost:4000/api/users/login',(req,res,ctx) =>{

        return res(ctx.json(null));
      
    })
);

test("Successful Login", async() =>{
    server.listen();
    customRender(<Login/>);

     const userEmail = screen.getByPlaceholderText(/Enter email/i);
     const testValue = "testEmail@gmail.com";
     fireEvent.change(userEmail, {target: {value: testValue}});

     const userPassword = screen.getByPlaceholderText(/Enter Password/i);
     const testValue2 = "testPassword";
     fireEvent.change(userPassword, {target: {value: testValue2}});

     fireEvent.click(screen.getByText("Submit"));
     
         //An user correctly login
     await waitFor(()=>{
        expect(screen.getByText("Successful Login !")).toBeInTheDocument();
     })
     server.close();
});


test("Failre Login", async () =>{
    server2.listen();
    customRender(<Login/>);

    const userEmail = screen.getByPlaceholderText(/Enter email/i);
    const testEmail = "WrongEmail@gmail.com";
    fireEvent.change(userEmail, {target: {value: testEmail}});

   const userPassword = screen.getByPlaceholderText(/Enter Password/i);
    const testPassword = "WrongPassword";
    fireEvent.change(userPassword, {target: {value: testPassword}});

    fireEvent.click(screen.getByText("Submit"));

    //An user wrong login
    await waitFor(()=>{
        expect(screen.getByText("Wrong email or password, pls try again!")).toBeInTheDocument();
    })
    server2.close();
}); 