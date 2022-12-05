import { screen, cleanup } from "@testing-library/react";
import WS from "jest-websocket-mock";
import Video from "../../components/Video";
import { renderWithProviders } from "../../utils/redux-test";
import reducer, { setSocket } from "../../store/slices/callSlice";

const initData = {
  localStream: { id: 12312 },
  remoteStream: { id: 43434 },
  me: "123123",
  socketId: 123155,
};

describe("Video Test", () => {
  afterEach(cleanup);
  it("Render Create Video Call Button ", () => {
    renderWithProviders(<Video />);
    const buttontext = screen.getByText(/Create Video Call/i);
    expect(buttontext).toBeDefined();
  });

  it("Create WebSocket Server ", async () => {
    const server = new WS("ws://localhost:1234");
    const client = new WebSocket("ws://localhost:1234");
    await server.connected;
    client.send("hello");
    await expect(server).toReceiveMessage("hello");
    expect(server).toHaveReceivedMessages(["hello"]);
  });

  it("Render socketId ,  connect socket and peerjs with dummy data for redux", async () => {
    renderWithProviders(<Video />, {
      preloadedState: {
        call: initData,
      },
    });
    const socketId = screen.getByText(/123155/i);
    expect(socketId).toBeDefined();
  });

  it("It work Close Call Socket Clear ", async () => {
    renderWithProviders(<Video />, {
      preloadedState: {
        call: initData,
      },
    });
    expect(reducer(initData, setSocket(null))).toEqual({
      ...initData,
      socketId: null,
    });
  });
});
