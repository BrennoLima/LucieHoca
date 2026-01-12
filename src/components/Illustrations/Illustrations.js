import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import IllustrationCard from "./IllustrationCard";

const ILLUSTRATIONS = [
  {
    image: "assets/illustrations/illustration1.jpg",
    title: "The Watchful Leopard",
    description:
      "A surreal, wide-eyed leopard twists its body mid-motion, blending curiosity and quiet tension against a dreamlike blue ground.",
  },
  {
    image: "assets/illustrations/illustration2.jpg",
    title: "Fishy Business",
    description:
      "Anthropomorphic creatures negotiate an absurd exchange, blurring the line between fable, satire, and human bureaucracy.",
  },
  {
    image: "assets/illustrations/illustration3.jpg",
    title: "Monster House",
    description:
      "A distorted figure reaches toward a warped wooden house, suspended in a violent red landscape charged with unease and psychological tension.",
  },
  {
    image: "assets/illustrations/illustration4.jpg",
    title: "The Night Courier",
    description:
      "A horned creature navigates a moonlit village, carrying an unseen burden through a frozen, storybook night.",
  },
  {
    image: "assets/illustrations/illustration5.jpg",
    title: "When the Birds Came In",
    description:
      "Two children hide beneath blankets as a surreal swarm of birds floods the room, where fear and wonder collide.",
  },
  {
    image: "assets/illustrations/illustration6.jpg",
    title: "The Alchemist",
    description:
      "A solitary figure studies a glowing jar beneath a cosmic sky, evoking curiosity and the magic of forgotten knowledge.",
  },
  {
    image: "assets/illustrations/illustration7.jpg",
    title: "Bearer of Light",
    description:
      "A horned beast gazes upward as radiant light breaks through swirling skies, symbolizing revelation and awakening.",
  },
  {
    image: "assets/illustrations/illustration8.jpg",
    title: "The Ember Guardian",
    description:
      "A fiery, sinewy creature emerges from darkness, embodying raw energy, resilience, and controlled chaos.",
  },
  {
    image: "assets/illustrations/illustration9.jpg",
    title: "Falling Through Dreams",
    description:
      "A floating figure drifts through abstract currents, suspended between surrender and transformation.",
  },
  {
    image: "assets/illustrations/illustration10.jpg",
    title: "The Hidden Grotto",
    description:
      "A glowing cavern reveals a secret path, inviting the viewer into a mysterious, otherworldly sanctuary.",
  },
  {
    image: "assets/illustrations/illustration11.jpg",
    title: "The Moth King",
    description:
      "A regal insect-like creature sits in solemn stillness, balancing fragility and authority in a mythic portrait.",
  },
  {
    image: "assets/illustrations/illustration12.jpg",
    title: "Cub of Curiosity",
    description:
      "A wide-eyed tiger cub pauses mid-step, capturing innocence, vulnerability, and untamed potential.",
  },
  {
    image: "assets/illustrations/illustration13.jpg",
    title: "The Hanging Bat",
    description:
      "A bat dangles quietly in shadow, rendered with delicate detail that balances eeriness and quiet charm.",
  },
  {
    image: "assets/illustrations/illustration14.jpg",
    title: "The Keeper of Yarn",
    description:
      "A small creature guards an oversized ball of yarn, a playful meditation on comfort, obsession, and care.",
  },
  {
    image: "assets/illustrations/illustration15.jpg",
    title: "The Framed Familiar",
    description:
      "A stylized animal portrait enclosed in ornate detail, echoing antique illustration and timeless storytelling.",
  },
];

const Illustrations = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Stack
      id="illustrations"
      sx={{
        py: 2,
        height: "100vh",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Typography textAlign="center" variant="h2" sx={{ my: 2 }}>
        <i>Illustrations</i>
      </Typography>

      <Box
        sx={{
          p: { xs: 2, md: 0 },
          margin: "auto 0",
          "& .swiper": {
            pt: "2%",
          },
          "& .swiper-pagination": {
            position: "relative",
            pt: 8,
          },
          "& .swiper-slide": {
            cursor: "grab",
            transition: "all 0.4s linear",
          },
          "& .swiper-slide-active": {
            transform: ["none", "scale(1.1)"],
          },
          "& .swiper-slide-prev, & .swiper-slide-next": {
            transform: "scale(0.8)",
            opacity: 0.8,
            filter: "blur(1px)",
          },
        }}
      >
        <Swiper
          autoplay={{
            delay: 4000,
            disableOnInteraction: true,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            type: "fraction",
          }}
          loop={true}
          slidesPerView={isMobile ? 1 : 3}
          centeredSlides={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {ILLUSTRATIONS.map((illustration) => (
            <SwiperSlide key={illustration.image}>
              <IllustrationCard {...illustration} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          endIcon={<ArrowRightIcon />}
        >
          See All
        </Button>
      </Box>
    </Stack>
  );
};

export default Illustrations;
