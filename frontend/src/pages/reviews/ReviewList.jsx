import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ReviewList = () => {
    const { companyId } = useParams();
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // GET /api/companies/{companyId}/review
        axios.get(`/api/companies/${companyId}/review`)
            .then(res => setReviews(res.data))
            .catch(err => console.error(err));
    }, [companyId]);

    return (
        <div className="list-container">
            <button onClick={() => navigate(`/companies/${companyId}/review/new`)}>글쓰기</button>
            <table>
                <tbody>
                    {reviews.map((review) => (
                        <tr key={review.id} onClick={() => navigate(`/companies/${companyId}/review/${review.id}`)}>
                            <td>{review.title}</td>
                            <td>{review.jobCategory}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReviewList;