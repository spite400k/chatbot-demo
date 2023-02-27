import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const AnswerButton = styled(Button)(({ theme }) => ({
    borderColor: '#FFB549',
    color: '#FFB549',
    fontWeight: 600,
    marginBottom: `8px`,
    "&:hover": {
        borderColor: '#FFB549',
        backgroundColor: '#FFB549',
        color: '#fff',
    },
})); //mui v5からmakeStylesが非推奨になったのでstyledを使う

const Answer = (props) => {
    return (
        <AnswerButton variant="outlined" onClick={() => props.select(props.content, props.nextId)}>
            {props.content}
        </AnswerButton>
    )
}

export default Answer;