import React from 'react';

function MyPageButtons({ tab, setTab }) {
    return (
        <>
            <Button variant={tab === "analysis" ? "contained" : "outlined"}
                onClick={() => setTab("analysis")}>
                기업 분석
            </Button>
            <Button variant={tab === "review" ? "contained" : "outlined"}
                onClick={() => setTab("review")}>
                기업 후기
            </Button>
        </>
    );
}

export default MyPageButtons;