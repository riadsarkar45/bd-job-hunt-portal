import React from 'react';
import { useLoaderData } from "react-router-dom";
import DOMPurify from 'dompurify';

const Detail = () => {
    const data = useLoaderData();
    const { roleName, salary, skill, experience, type, content, location } = data;

    // Sanitize HTML content to remove unwanted tags
    const sanitizedContent = DOMPurify.sanitize(content);
    console.log(skill)
    return (
        <div className="bg-gray-200 mt-[8rem] w-[70%] m-auto rounded-md p-3">
            <div className="0">
                <h2 className="text-3xl">{roleName}</h2>
                <p>{salary} salary</p>
                <p>{experience} experience</p>
                <p>{type}</p>
                <p>{location} location</p>
                <h2>Skills</h2>
                <div className='flex gap-4'>
                    <div>Skills:</div>
                    <div>
                        {
                            skill?.map(sk =>
                                <div key={sk._id} className="badge badge-outline">{sk.label}</div>

                            )
                        }
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </div>
        </div>
    );
};

export default Detail;
