import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

const JobCard = ({ job }) => {
    const { roleName, type, salary, jobLocation, _id, companyName } = job
    return (
        <div>

            <Link to={`detail/${_id}`}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image="https://i.ibb.co/cX6vDPJ/download-3.jpg"
                        title="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {roleName}
                        </Typography>
                        <Typography gutterBottom variant="p" component="div">
                            {companyName}
                        </Typography>
                        <Typography gutterBottom variant="p" component="div">
                            BDT {salary}
                        </Typography>
                        <Typography gutterBottom variant="p" component="div">
                            {type}
                        </Typography>
                        <Typography gutterBottom variant="p" component="div">
                            {jobLocation}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </div>
    );
};

export default JobCard;