import express, { Request, Response } from "express";
import { PORT } from "./utils/config";
import { connectToDB } from "./utils/connectToDb";
import { customErrorHandler } from "./middlewares/customErrorHandler";
import customReqLogger from "./utils/customRequestLogger";
import cors from "cors";
import authRouter from "./routers/auth.route";
import postModel from "./models/post.model";

const server = express();

// middlewares
server.use(
  cors({
    origin: (origin: any, callback: any) => {
      if (!origin || ["http://localhost:5173"].indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
server.use(express.json());
//custom request logger
server.use(customReqLogger);

// Routers
// auth router
server.use("/api/auth", authRouter);

// custom error handler
server.use(customErrorHandler);

const startServer = async () => {
  try {
    await connectToDB();
    console.log("connected to mongoose.");
    server.listen(PORT, async () => {
      console.log(`server started listening at port ${PORT}`);
      // postModel.insertMany([
      //   {
      //     title: "POST NO.1 CONTAINING A YOUTUBE VIDEO",
      //     desc: "Quisque at tellus nec magna viverra euismod. Maecenas lobortis, nisl et sodales blandit, neque mi ullamcorper eros, id efficitur ex velit in ante. Suspendisse elementum congue lacus quis gravida. Nunc eu hendrerit risus. Quisque blandit, orci non maximus vulputate, ligula ante ornare enim, ac interdum lorem leo varius mauris. Aliquam non sem vel orci malesuada sagittis. Vivamus id ullamcorper tellus. In hac habitasse platea dictumst. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras et sapien a arcu feugiat mattis. Suspendisse sed magna quis turpis rhoncus venenatis.",
      //     category: "Nature",
      //     cover:
      //       "https://firebasestorage.googleapis.com/v0/b/blogapp-45586.appspot.com/o/blogImages%2Fb1.jpg?alt=media&token=0080cfc8-f904-485f-b78a-00d2a867ee71",
      //   },

      //   {
      //     title: "JUPITER IS FULL OF WATERFALLS SO EARLY",
      //     desc: "Vestibulum suscipit nibh sed odio pharetra, condimentum lacinia nisi varius. Ut ac ornare diam. Suspendisse vitae quam risus. Nulla ullamcorper libero justo, vitae dictum est efficitur id. Aenean et lacinia arcu. Sed non dolor id risus dapibus congue. Quisque tincidunt vitae tellus ut malesuada. Nulla eleifend nibh a maximus consectetur. Duis et mi porta, bibendum leo non, fermentum enim. Vivamus sed diam suscipit, ultricies ipsum sed, efficitur dui. Sed pharetra purus at iaculis vehicula. Fusce pellentesque placerat ante, id elementum dolor maximus sed. Aenean viverra at lectus quis vehicula. Aenean at arcu odio. Etiam mauris justo, cursus finibus aliquam eget, fermentum nec nulla. Sed finibus viverra magna non sagittis. Mauris fringilla augue vel quam rhoncus, in tempor enim lacinia. Donec nibh velit, scelerisque id neque sit amet, ornare consectetur sem. Donec convallis nec justo id consequat. Donec sem leo, pulvinar sit amet nisi a, mollis gravida est. Duis porttitor eleifend cursus. Vivamus ac dapibus dolor. Nullam leo tellus, rhoncus sit amet tempor vel, malesuada vel augue. Morbi laoreet sem eget tortor pulvinar mattis. Maecenas commodo ultricies orci, ut blandit urna accumsan sit amet. Ut a porttitor orci, maximus feugiat turpis. In eu sodales orci, et volutpat felis. Quisque orci quam, gravida at nulla tempor, vulputate pretium magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent congue, magna vitae interdum blandit, arcu mauris placerat nulla, sit amet rhoncus justo risus in neque.",
      //     category: "Nature",
      //     cover:
      //       "https://firebasestorage.googleapis.com/v0/b/blogapp-45586.appspot.com/o/blogImages%2Fb2.jpg?alt=media&token=c8473965-384f-46d6-91df-60e0884ebcea",
      //   },
      //   {
      //     id: 3,
      //     title: "START YOU CUP ON TABLE OF THAT",
      //     desc: "Duis rutrum eu tortor et efficitur. Nulla ac consequat leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut vestibulum mattis est eu volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae tristique nibh. Quisque vel lectus interdum lacus ultricies venenatis. In ex nisl, commodo vitae risus ac, efficitur imperdiet dolor. Maecenas dignissim luctus mi sit amet mollis. Maecenas sit amet bibendum dolor, a molestie tellus. Donec et varius risus. Duis tincidunt mi lorem, vitae luctus turpis rutrum sit amet. Aliquam aliquet malesuada odio, ut pellentesque nisi tempus in. Ut fermentum, augue id accumsan aliquet, dolor dui euismod elit, nec fringilla mi justo nec mauris. Duis tellus nisl, elementum et urna at, molestie condimentum eros. Sed mattis quis risus id tincidunt. Donec ultrices vestibulum vestibulum.",
      //     category: "Sports",
      //     cover:
      //       "https://firebasestorage.googleapis.com/v0/b/blogapp-45586.appspot.com/o/blogImages%2Fb3.jpg?alt=media&token=aac50230-b480-4c79-aacf-4c142b0c4657",
      //   },
      //   {
      //     id: 4,
      //     title: "START YOU CUP ON TABLE OF THAT",
      //     desc: "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition.",
      //     category: "Fashion",
      //     cover:
      //       "https://firebasestorage.googleapis.com/v0/b/blogapp-45586.appspot.com/o/blogImages%2Fb4.jpg?alt=media&token=3467ea35-cb97-4260-85d7-41dc58ad4ac5",
      //   },
      //   {
      //     id: 5,
      //     title: "SMART TYPE OF GAMING WITH CO-OP",
      //     desc: "It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition.",
      //     category: "Sports",
      //     cover:
      //       "https://firebasestorage.googleapis.com/v0/b/blogapp-45586.appspot.com/o/blogImages%2Fb5.jpg?alt=media&token=f5c44d85-c361-4430-88de-97c705e892c4",
      //   },
      //   {
      //     id: 6,
      //     title: "TEACH YOUR DRAGON HOW TO FLY",
      //     desc: "Magnis modipsae que lib voloratati andigen daepedor quiate ut reporemni aut labor. Laceaque quiae sitiorem ut restibusaes es tumquam core posae volor remped modis volor. Doloreiur qui commolu ptatemp dolupta orem retibusam emnis et consent accullignis lomnus. We don't want to overload you with hundreds of styles you don't want, or need. We give you a strong base to express your own creativity.",
      //     category: "Fashion",
      //     cover:
      //       "https://firebasestorage.googleapis.com/v0/b/blogapp-45586.appspot.com/o/blogImages%2Fb6.jpg?alt=media&token=37d50ed8-ec54-43af-8efe-5e7766ea2a11",
      //   },
      //   {
      //     id: 7,
      //     title: "TEACH YOUR DRAGON HOW TO FLY",
      //     desc: "Magnis modipsae que lib voloratati andigen daepedor quiate ut reporemni aut labor. Laceaque quiae sitiorem ut restibusaes es tumquam core posae volor remped modis volor. Doloreiur qui commolu ptatemp dolupta orem retibusam emnis et consent accullignis lomnus. We don't want to overload you with hundreds of styles you don't want, or need. We give you a strong base to express your own creativity.",
      //     category: "Fashion",
      //     cover:
      //       "https://firebasestorage.googleapis.com/v0/b/blogapp-45586.appspot.com/o/blogImages%2Fb7.jpg?alt=media&token=da68ad59-4b5b-49e9-8282-fd87d48a680d",
      //   },
      //   {
      //     id: 8,
      //     title: "TEACH YOUR DRAGON HOW TO FLY",
      //     desc: "Magnis modipsae que lib voloratati andigen daepedor quiate ut reporemni aut labor. Laceaque quiae sitiorem ut restibusaes es tumquam core posae volor remped modis volor. Doloreiur qui commolu ptatemp dolupta orem retibusam emnis et consent accullignis lomnus. We don't want to overload you with hundreds of styles you don't want, or need. We give you a strong base to express your own creativity.",
      //     category: "Fashion",
      //     cover:
      //       "https://firebasestorage.googleapis.com/v0/b/blogapp-45586.appspot.com/o/blogImages%2Fb8.jpg?alt=media&token=4bfaa7ac-e76a-400d-aa6a-4522dc567330",
      //   },
      //   {
      //     id: 9,
      //     title: "TEACH YOUR DRAGON HOW TO FLY",
      //     desc: "Magnis modipsae que lib voloratati andigen daepedor quiate ut reporemni aut labor. Laceaque quiae sitiorem ut restibusaes es tumquam core posae volor remped modis volor. Doloreiur qui commolu ptatemp dolupta orem retibusam emnis et consent accullignis lomnus. We don't want to overload you with hundreds of styles you don't want, or need. We give you a strong base to express your own creativity.",
      //     category: "Fashion",
      //     cover:
      //       "https://firebasestorage.googleapis.com/v0/b/blogapp-45586.appspot.com/o/blogImages%2Fb9.jpg?alt=media&token=0793559e-ffb0-48e1-86ba-9f2d438c8bb6",
      //   },

      //   {
      //     id: 10,
      //     title: "TEACH YOUR DRAGON HOW TO FLY",
      //     desc: "Magnis modipsae que lib voloratati andigen daepedor quiate ut reporemni aut labor. Laceaque quiae sitiorem ut restibusaes es tumquam core posae volor remped modis volor. Doloreiur qui commolu ptatemp dolupta orem retibusam emnis et consent accullignis lomnus. We don't want to overload you with hundreds of styles you don't want, or need. We give you a strong base to express your own creativity.",
      //     category: "Fashion",
      //     cover:
      //       "https://firebasestorage.googleapis.com/v0/b/blogapp-45586.appspot.com/o/blogImages%2Fb10.jpg?alt=media&token=a6c05cc7-46e5-4c8e-ba8d-944c467811c7",
      //   },
      // ]);
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
startServer();
