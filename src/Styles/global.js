import { createGlobalStyle } from "styled-components";


export const GlobalStyles = createGlobalStyle`

*{
    box-sizing: border-box;
}

body{
    background:${({ theme }) => theme.background};
    color: ${({ theme }) => theme.title};
    padding:0;
    margin:0;
    transition: all 0.25s linear;
    overflow-y: scroll;
    width: 100%;

}

body::-webkit-scrollbar{
    display: none;
}

.canvas{
    display: grid;
    min-height: 100vh;
    grid-auto-flow: row;
    grid-template-row: auto 1fr auto;
    gap: 0.5rem;
    padding:2rem;
    width:100vw;
    text-align: center;
    align-items: center;
}
.middle-div{
    height:auto;
}
.type-box{
    display:block;
    max-width: 1000px;
    height: 140px;
    margin-left:auto;
    margin-right:auto;
    overflow: hidden;
}

.words{
    font-size: 32px;
    display: flex;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    flex-wrap: wrap;
    height: auto;
    align-content:center;
    color: ${({ theme }) => theme.typeBoxText}
}

.word{
    margin: 5px;
    padding-right:2px;
}

.hidden-input{
    opacity:0;
}

.correct{
    color: ${({ theme }) => theme.title};
}

.incorrect, .extra{
    color: red;
}

.current{
    border-left: 1px solid;
    animation: blinkingLeft 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingLeft{
        0% {border-left-color:${({ theme }) => theme.textColor};}
        25% {border-left-color:${({ theme }) => theme.background};}
        50% {border-left-color:${({ theme }) => theme.textColor};}
        75% {border-left-color:${({ theme }) => theme.background};}
        100% {border-left-color:${({ theme }) => theme.textColor};}
    }
}

.current-right{
    border-right: 1px solid;
    animation: blinkingRight 2s infinite;
    animation-timing-function: ease;
    @keyframes blinkingRight{
        0% {border-right-color:${({ theme }) => theme.textColor};}
        25% {border-right-color:${({ theme }) => theme.background};}
        50% {border-right-color:${({ theme }) => theme.textColor};}
        75% {border-right-color:${({ theme }) => theme.background};}
        100% {border-right-color:${({ theme }) => theme.textColor};}
    }
}

.skipped{
    color: grey;
}

.footer{
    border-top: 2px solid;

    display:flex;
    flex-direction: column;
    align-self: end;
       width: 80%;

    margin-left:auto;
    margin-right:auto;
}
.hint{
    text-align: center;
    margin-top: 1rem;
}
.actual-footer{
    display: flex;
    justify-content: space-between;
}

.stats-box{
    display: flex;
    max-width: 1000px;
    height: auto;
    margin-left: auto;
    margin-right: auto;
}

.left-stats{
    width: 30%;
    padding: 30px;
}

.right-stats{
    width: 70%;
}

.title{
    font-size: 20px;
    color: ${({ theme }) => theme.typeBoxText};
}

.subtitle{
    font-size: 30px;
    color: ${({ theme }) => theme.title};
}

a{
    text-decoration: none;
    color: inherit;
}

.upper-menu{
    display:flex;
        width: 80%;

    margin-left:auto;
    margin-right:auto;
    justify-content:space-between;
    font-size:1.35rem;
    padding:0.5rem;
}

.time-modes, .word-modes{
    display:flex;
}
.time, .no-of-word{
    margin-right:5px;
}
.time:hover, .no-of-word:hover{
    color:${({ theme }) => theme.typeBoxText};
    cursor: pointer;
}

.header{
    display: flex;
    width: 80%;
    align-self: stretch;
    margin-left: auto;
    margin-right: auto;
    height: 10rem;
    justify-content: space-between;
    border-bottom: 2px solid;
}

.github-button{
    width: 400px;
    text-align: center;
    background: blue;
    height: 3rem;
    border: 2px solid;
    border-radius: 10px;
}

.user-profile{
    width: 80%;
    margin: auto;
    display: flex;
    min-height: 15rem;
    background: ${({ theme }) => theme.typeBoxText};
    border-radius: 20px;
    justify-content: center;
    align-text: center;
}

.user{
    width: 50%;
    display: flex;
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 1.5rem;
    padding: 1rem;
    border-right: 2px solid;
}

.info{
    width: 60%;
    padding: 1rem;
    margin-top: 1rem;
}
.picture{
    width: 40%;
}

.total-tests{
    width: 50%;
    font-size: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.table{
    width: 80%;

    margin: auto;
}
.graph{
width: 80%;
margin-left: auto;
margin-right: auto;

}

.center-of-screen{
    display:flex;
    min-height:100vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 3rem;
}

.logo{
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 10px;
    align-items: start;
}

.compare-btn{
    cursor: pointer;
    color: ${({ theme }) => theme.background};
    background: ${({ theme }) => theme.title};
    padding: 0.3rem;
    border-radius: 5px;
    margin-top: -5px;
}

.instruction{
    color: ${({ theme }) => theme.title};
}

.hint{
    kbd{
        background: ${({ theme }) => theme.title};
        color: ${({ theme }) => theme.background};
        padding: 2.5px 5px;
        border-radius: 4px; 
    }
}

.active{
    border: 1px solid;
    padding: 3px;
    margin: 4px;
}

.active-value{
    border: 1px solid;
    padding: 3px;
    margin: 4px;
    margin-top: -4px;
}

.logo-image{
    transform: scale(0.3);
    margin-top: -100px;
    margin-left: -90px;
    display: block;
}

.mode{
    cursor: pointer;
}
.themes {
  width: 200px; /* Set the desired width */
}

`;