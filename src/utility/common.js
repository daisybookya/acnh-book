export const randomBk = ()=>{
    const path = '.'
    const bk = {
        0:`${path}/leaves.webp`,
        1:`${path}/leaves2.webp`,
        2:`${path}/fruit.webp`,
        3:`${path}/cloud.webp`,
        4:`${path}/old_map.png`,
    }
    const randomNum = Math.floor(Math.random() * 5);
    return {
        backgroundImage: `url(${bk[randomNum]})`
    }
}
export const backTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
export function turnMonth(value) {
    if (value.length > 0 && value.indexOf("-") > -1) {
      const monthAry = value.split("-");
      return `${monthAry[0]}月 ~ ${monthAry[1]}月`;
    } else if (value.length > 0) {
      return `${value}月`;
    }
    return "整年都有";
  }