// TODO
// Terms and conditions button not part of the figma design
// Red popup-button on 25th day

import Grid from "@mui/joy/Grid";
import { styled } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import { useState, useCallback, useEffect } from "react";
import Modal from "@mui/joy/Modal";
import Button from "@mui/joy/Button";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css/bundle";
import _ from "lodash";

const a3 = 11;
const a2 = 110;
const a4 = 15;
const a5 = 20;
const a6 = 30;
const finalIndex = 24;
const finalColor = "#A91C25";
const cardGradient =
  "linear-gradient(to right bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.05))";

const baseIphone = {
  winnerVal: "one winner",
  prodImage:
    "https://user-images.githubusercontent.com/284717/204312615-29fdd34f-b7b6-4851-aebc-a711939fe629.png",
  prodName: "iPhone 14 Pro 512GB",
  prodSubtext: "Every day you can win awesome Apple goodies!",
};
const baseAirpods = {
  winnerVal: "two winners",
  prodImage:
    "https://user-images.githubusercontent.com/284717/204313639-7fb9f4a7-fbc2-417e-a1e4-ce8136c8e7f5.png",
  prodName: "Airpods Pro (2nd gen)",
  prodSubtext: "Every day you can win awesome Apple goodies!",
};

const baseWatch = {
  winnerVal: "one winner",
  prodImage:
    "https://user-images.githubusercontent.com/284717/204312639-3954eb15-af87-48a1-a2ff-7b15e2e3dd6f.png",
  prodName: "Apple Watch Series 8",
  prodSubtext: "Every day you can win awesome Apple goodies!",
};

const baseMac = {
  winnerVal: "one winner",
  prodImage:
    "https://user-images.githubusercontent.com/284717/204369937-cac4c656-3c43-4dfc-9298-61cec7924f2e.png",
  prodName: "14-inch MacBook Pro",
  prodSubtext: "Every day you can win awesome Apple goodies!",
};

const baseIpad = {
  winnerVal: "one winner",
  prodImage:
    "https://user-images.githubusercontent.com/284717/204312636-fe000fc9-bd0a-4c1a-bbb1-c2aa0f4de194.png",
  prodName: "iPad (10th gen) 256GB",
  prodSubtext: "Every day you can win awesome Apple goodies!",
};
const prodList = [
  baseIphone,
  baseAirpods,
  baseWatch,
  baseMac,
  baseIpad,
  baseWatch,
  baseIphone,
  baseAirpods,
  baseIpad,
  baseMac,
  //11th day
  baseIphone,
  baseWatch,
  baseAirpods,
  baseIpad,
  baseMac,
  baseWatch,
  baseIphone,
  baseIpad,
  baseAirpods,
  baseWatch,
  //21th day
  baseIpad,
  baseMac,
  baseAirpods,
  baseIphone,
  baseMac,
];

// https://stackoverflow.com/a/31615643/6227407
function getNumberWithOrdinal(n) {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const GiftIn = ({ i, selectedDay, sx }) => (
  <Box
    className="giftIn"
    sx={{
      // https://codepen.io/ananyaneogi/pen/Bgozrz
      textShadow:
        selectedDay !== i
          ? "0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000"
          : undefined,
      color: i === finalIndex ? finalColor : "#fff6a9",

      transitionDuration: "0.3s",
      ...sx,
    }}
  >
    {getNumberWithOrdinal(i + 1)} day
  </Box>
);

const BaseContainer = styled("span")(() => ({
  fontFamily: "Luckiest Guy",
  fontSize: "xx-large",
}));

const GrandButton = styled(Button)(() => ({
  fontFamily: "Luckiest Guy",
  fontSize: "x-large",
  borderRadius: 100,
  padding: "15px 30px 15px 30px",
  color: "#181831",
  backgroundColor: "#ffbd00",
  "&:hover": {
    backgroundColor: "#ffe499",
  },
  "&:active": {
    backgroundColor: "#997000",
  },
  boxShadow: "2px 6px 6px 1px #0e0b24",
}));

const GiftMain = styled(Grid)(() => ({
  textAlign: "center",
  padding: 20,
  position: "relative",
  "&:hover div.giftTop, &:focus div.giftTop": {
    top: -20,
    left: 40,
    transform: "rotate(30deg)",
  },
  "&:hover div.giftBot, &:focus div.giftBot": {
    transform: "rotate(-10deg)",
  },
  "&:hover div.giftIn, &:focus div.giftIn": {
    opacity: 1,
  },
  "&:focus div.giftIn": {
    transform: "scale(1.7)",
  },
}));

const GiftElement = ({ i, selectedDay, initModal }) => {
  return (
    <GiftMain item tabIndex={i.toString()} onClick={() => initModal(i)}>
      <GiftIn
        i={i}
        selectedDay={selectedDay}
        sx={{ opacity: 0, marginTop: a3 }}
      />
      <Box
        className="giftBot"
        sx={{
          transformOrigin: "100% 70%",
          transition: "1.5s ease-in-out",
        }}
      >
        <img
          src={
            finalIndex === i
              ? "https://user-images.githubusercontent.com/284717/204018312-41706d04-4e02-4bc8-b660-aba118901779.svg"
              : "https://user-images.githubusercontent.com/284717/204018332-cafa081f-3da9-43c8-a325-993b5b579e3f.svg"
          }
          alt="cover"
          style={{
            width: "80%",
          }}
        />
      </Box>
      <Box
        className="giftTop"
        sx={{
          position: "absolute",
          top: a2,
          left: a4,
          transitionDuration: "0.5s",
        }}
      >
        <img
          src={
            finalIndex === i
              ? "https://user-images.githubusercontent.com/284717/204018306-8641e0e0-33d9-4412-a222-7dc955ea9661.svg"
              : "https://user-images.githubusercontent.com/284717/204018324-3d2562ed-182d-4ff2-b2bd-33cef01b57bd.svg"
          }
          alt="gift"
          style={{ width: "80%" }}
        />
      </Box>
    </GiftMain>
  );
};

const CardContainer = styled(Box)(({ urlBack, isLogo, style }) => {
  const backGround = (isBig) =>
    `url('${urlBack}') ${isBig ? 100 : 50}% ${isBig && isLogo ? 50 : 100}% / ${
      isBig ? (isLogo ? 35 : 40) : isLogo ? 60 : 70
    }% no-repeat, ${cardGradient}`;
  return {
    borderRadius: a5,
    padding: 60,
    background: backGround(true),
    "@media (max-width: 600px)": {
      background: backGround(false),
      padding: "20px 20px 210px 20px",
    },
    ...style,
  };
});

const GiftContainer = styled(Grid)(() => ({
  background: cardGradient,
  borderRadius: a5,
}));

const BaseCard = ({ children, ...actualProps }) => (
  <CardContainer {...actualProps}>{children}</CardContainer>
);

const SharedTexts = ({ firstText, secondText, buttonOnClick }) => (
  <Grid container>
    <Grid item sm={8}>
      <Grid container spacing={2} direction="column">
        <Grid item sx={{ fontSize: 40 }}>
          {firstText}
        </Grid>
        <Grid item className="subString">
          {secondText}
        </Grid>
        <Grid item>
          <GrandButton onClick={buttonOnClick}>PLAY & WIN!</GrandButton>
        </Grid>
      </Grid>
    </Grid>
    <Grid item sm={4}></Grid>
  </Grid>
);

const SharedAnim = ({ src, mode, marginTop, children }) => (
  <Grid
    container
    spacing={2}
    alignItems="center"
    justifyContent="center"
    direction="column"
    sx={{ marginTop, textAlign: "center" }}
  >
    <Grid item>
      <lottie-player
        src={src}
        background="transparent"
        speed="1"
        loop
        autoplay
        mode={mode}
        style={{ width: "280px" }}
      ></lottie-player>
    </Grid>
    {children}
  </Grid>
);

const goRoot = () =>
  window.open(
    "https://roobet.com/?utm_source=promotions&utm_medium=lp&utm_campaign=rooxmas22",
    "_blank"
  );
const goPlinko = () =>
  window.open(
    "https://roobet.com/plinko?utm_source=promotions&utm_medium=lp&utm_campaign=rooxmas22",
    "_blank"
  );

const Advent = ({ langValue, putLang }) => {
  const [isModal, setIsModal] = useState(false);
  const [liveModal, setLiveModal] = useState(false);
  const [loadedPortrait, setLoadedPortrait] = useState(true);
  const [selectedDay, setSelectedDay] = useState();

  // https://stackoverflow.com/a/67941248
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setIsModalDebounce = useCallback(_.debounce(setIsModal, 700), []);

  useEffect(() => {
    // Trigger css animation
    setLiveModal(isModal && loadedPortrait);
  }, [isModal, loadedPortrait]);

  return (
    <BaseContainer>
      <snowfall>
        {[...Array(50).keys()].map((x) => (
          <snowflake key={x}>
            <img
              src={
                x % 2 === 0
                  ? "https://user-images.githubusercontent.com/284717/204018265-16741c63-001f-481e-8ff6-398c5e864d12.png"
                  : "https://user-images.githubusercontent.com/284717/204018249-a089944e-c983-4ce9-8174-bd8aa52b3689.png"
              }
              alt="addict"
            />
          </snowflake>
        ))}
      </snowfall>
      <BaseCard
        urlBack={
          "https://user-images.githubusercontent.com/284717/204059859-875ed8c1-83ea-4376-abe5-cbcc1eca9f94.png"
        }
        isLogo
      >
        <SharedTexts
          firstText={
            <>
              Santa Roo’s<Box className="ye">Xmas Special</Box>
            </>
          }
          secondText="Celebrate with Holiday events all through December!"
          buttonOnClick={goRoot}
        />
      </BaseCard>
      <SharedAnim
        src="https://assets6.lottiefiles.com/packages/lf20_9gmlwgi8.json"
        mode="bounce"
        marginTop={1}
      >
        <>
          <Grid item className="superString">
            Santa Roo's<Box className="ye">December Drops</Box>
            <Box sx={{ marginTop: 2, fontSize: "x-large" }}>
              December 1 - 25
            </Box>
          </Grid>
          <Grid item className="subString">
            Forget about the 12 days of Christmas… Santa Roo’s bringing you 25
            days of presents! Every day until December 25th, our merry marsupial
            will be lightening the load on his sleigh and giving away awesome
            gifts!
          </Grid>
          <Grid item className="subString">
            This means that you’ll have the chance to snap up some great goodies
            like AirPods, Apple Watches, the latest iPhones and iPads, and
            MacBook Pros!
          </Grid>
          <Grid item className="subString">
            Look inside to see what Santa Roo's dropping down the chimney!
          </Grid>
        </>
      </SharedAnim>
      <GiftContainer
        container
        alignItems="center"
        justifyContent="center"
        style={{
          marginTop: a6,
        }}
      >
        {[...Array(25).keys()].map((i) => (
          <GiftElement
            key={i}
            i={i}
            selectedDay={selectedDay}
            initModal={(x) => {
              setSelectedDay(x);
              setLoadedPortrait(false);
              setIsModalDebounce(true);
            }}
          />
        ))}
      </GiftContainer>
      <Box sx={{ marginTop: 8, width: "100%", textAlign: "center" }}>
        <GrandButton onClick={goRoot}>Start Xmas Early</GrandButton>
        <Box>
          <a
            href="https://promotions.roobet.com/termsandconditions/santa-roos-december-drops"
            className="textLink smallLink"
            target="_blank"
            rel="noreferrer"
          >
            Terms and Conditions
          </a>
        </Box>
      </Box>
      <SharedAnim
        src="https://assets3.lottiefiles.com/packages/lf20_qb96plsj.json"
        marginTop={18}
      >
        <>
          <Grid item className="superString">
            Santa Roo's
            <Box className="ye">weekly raffles!</Box>
          </Grid>
          <Grid item className="subString">
            In the spirit of giving, Santa Roo will be giving away stacks of
            cash every single week!
          </Grid>
          <Grid item className="subString">
            Wager $500 on any slot to earn a raffle ticket.
          </Grid>
          <Grid item className="subString">
            All wagers on Roobet's brand new{" "}
            <a
              href="https://roobet.com/plinko/?utm_source=promotions&utm_medium=lp&utm_campaign=rooxmas22"
              target="_blank"
              className="textLink"
              rel="noreferrer"
            >
              Plinko
            </a>{" "}
            will earn 5X tickets for every raffle!
          </Grid>
        </>
      </SharedAnim>
      <Swiper
        navigation={true}
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        style={{
          marginTop: a6,
        }}
      >
        <SwiperSlide>
          <BaseCard
            urlBack={
              "https://user-images.githubusercontent.com/284717/204107009-38070619-4b68-45d5-b10a-84f3e93fda19.png"
            }
          >
            <SharedTexts
              firstText={
                <>
                  Santa Roo's $30K Reindeer Raffle
                  <Box className="ye">December 5 - 11</Box>
                </>
              }
              secondText="Play and earn tickets for a chance to win $500 or a grand prize of $5,000! All wagers on Plinko earn 5X tickets!"
              buttonOnClick={goPlinko}
            />
          </BaseCard>
        </SwiperSlide>
        <SwiperSlide>
          <BaseCard
            urlBack={
              "https://user-images.githubusercontent.com/284717/204056517-7eee6c23-7ac3-4695-8356-9f559f0660e7.png"
            }
          >
            <SharedTexts
              firstText={
                <>
                  Santa Roo's $30K Snowball Raffle
                  <Box className="ye">December 12 - 18</Box>
                </>
              }
              secondText="50 winners will take home $500 and one lucky winner will win $5,000! Plinko wagers earn 5X tickets!"
              buttonOnClick={goPlinko}
            />
          </BaseCard>
        </SwiperSlide>
        <SwiperSlide>
          <BaseCard
            urlBack={
              "https://user-images.githubusercontent.com/284717/204056511-5692d359-ff83-4c54-870f-c879d55adf79.png"
            }
          >
            <SharedTexts
              firstText={
                <>
                  Santa Roo's $100K Xmas Raffle
                  <Box className="ye">December 19 - 25</Box>
                </>
              }
              secondText="Earn a ticket for every $500 wagered on slots. Santa Roo will be giving $100K worth of presents under the tree!"
              buttonOnClick={goRoot}
            />
          </BaseCard>
        </SwiperSlide>
        <SwiperSlide>
          <BaseCard
            urlBack={
              "https://user-images.githubusercontent.com/284717/204055017-75c8ee58-9603-490f-9648-487a12a0abc6.png"
            }
          >
            <SharedTexts
              firstText={
                <>
                  Santa Roo's $50K New Years Raffle
                  <Box className="ye">Dec 26 - Jan 1</Box>
                </>
              }
              secondText="Ring in the New Year with Roobet. We're giving a $50K when the ball drops!"
              buttonOnClick={goRoot}
            />
          </BaseCard>
        </SwiperSlide>
        <SwiperSlide>
          <BaseCard
            urlBack={
              "https://user-images.githubusercontent.com/284717/204056517-7eee6c23-7ac3-4695-8356-9f559f0660e7.png"
            }
          >
            <SharedTexts
              firstText={
                <>
                  Santa Roo's Maldives Raffle
                  <Box className="ye">January 2 - 8</Box>
                </>
              }
              secondText="Play for a chance for you and a friend to go on an all inclusive vacation to Maldives!"
              buttonOnClick={goRoot}
            />
          </BaseCard>
        </SwiperSlide>
      </Swiper>
      <SharedAnim
        src="https://assets4.lottiefiles.com/packages/lf20_ppphftht/data.json"
        marginTop={1}
      >
        <>
          <Grid item className="superString">
            Get in on the festive fun at roobet
            <Box className="ye">this holiday season!</Box>
          </Grid>
          <Grid item className="subString">
            With cash drops, Apple gadgets and other giveaways, Santa Roo is
            ringing in Christmas early this year!
          </Grid>
          <Grid item>
            <GrandButton onClick={goRoot}>
              SNAP UP SOME HOLIDAY GOODIES
            </GrandButton>
            <Box>
              <a
                href="https://promotions.roobet.com/termsandconditions/mr-roos-xmas-campaign-raffles"
                className="textLink smallLink"
                target="_blank"
                rel="noreferrer"
              >
                Terms and Conditions
              </a>
            </Box>
          </Grid>
        </>
      </SharedAnim>
      {!loadedPortrait && (
        <img
          // Load image before show modal
          onLoad={() => setLoadedPortrait(true)}
          onError={() => setLoadedPortrait(true)}
          src={
            selectedDay != null ? prodList[selectedDay].prodImage : undefined
          }
          alt="product"
          style={{ display: "none" }}
        />
      )}
      <Modal
        open={isModal && loadedPortrait}
        onClose={() => {
          setSelectedDay(undefined);
          setIsModal(false);
        }}
      >
        <ModalDialog size="lg" variant="outlined" sx={{ textAlign: "center" }}>
          <BaseContainer>
            <ModalClose />
            <GiftIn
              i={selectedDay}
              sx={{
                opacity: 1,
                fontSize: liveModal ? 80 : undefined,
                marginTop: -10,
              }}
            />
            <Grid
              container
              spacing={1}
              alignItems="center"
              justifyContent="center"
              direction="column"
            >
              <Grid item sx={{ display: { xs: "none", md: "block" } }}>
                On day {selectedDay + 1} of Xmas{" "}
                {selectedDay != null
                  ? prodList[selectedDay].winnerVal
                  : undefined}{" "}
                will be selected.
              </Grid>
              <Grid item>
                <img
                  alt="product"
                  // https://www.w3schools.com/howto/howto_css_image_responsive.asp
                  style={{
                    marginTop: 0,
                    width: "100%",
                    minWidth: 325,
                    maxWidth: 500,
                  }}
                  src={
                    selectedDay != null
                      ? prodList[selectedDay].prodImage
                      : undefined
                  }
                />
              </Grid>
              <Grid item className="subString">
                {selectedDay != null
                  ? prodList[selectedDay].prodName
                  : undefined}
              </Grid>
              <Grid
                item
                className="subString"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                {selectedDay != null
                  ? prodList[selectedDay].prodSubtext
                  : undefined}
              </Grid>
              <Grid item>
                <GrandButton onClick={goRoot}>PLAY & WIN!</GrandButton>
              </Grid>
            </Grid>
          </BaseContainer>
        </ModalDialog>
      </Modal>
    </BaseContainer>
  );
};

export default Advent;
