import React from 'react';
import { useRouter } from 'next/router';

import { BoardManager } from '../../../components/BoardManager';

export default function() {
    const router = useRouter();
    const { board = null } = router.query;
    console.log(router.query);

    return (
    <>
        <BoardManager boardName={String(board)} />
        <style jsx global>{`
            html,
            body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
                Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
            }

            * {
                box-sizing: border-box;
            }
        `}
        </style>
    </>
    )
}