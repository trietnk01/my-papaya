import React from "react";
import styles from "@/assets/scss/public-layout.module.scss";
const HomePage = () => {
  return (
    <React.Fragment>
      <div className={styles.newsBox}>
        <div className={styles.itemNews}>
          <a href="javascript:void(0);">
            <img src="/kinh-te-1.jpg" className={styles.itemImg} width={350} />
          </a>
          <div className={styles.itemInfo}>
            <h3 className={styles.titleCategory}>Pháp luật</h3>
            <h2 className={styles.titleNews}>
              <a href="javascript:void(0);">
                Tài xế xe đầu kéo vi phạm nồng độ cồn, đâm vào nhà dân
              </a>
            </h2>
            <div className={styles.introNews}>
              Lái xe đầu kéo có nồng độ cồn 0,5 mg/lít khí thở, đâm vào nhà dân bên đường khiến một
              người chết, một người nguy kịch, 5 người bị thương.
            </div>
          </div>
        </div>
        <div className={styles.itemNews}>
          <a href="javascript:void(0);">
            <img src="/kinh-te-2.jpg" className={styles.itemImg} width={350} />
          </a>
          <div className={styles.itemInfo}>
            <h3 className={styles.titleCategory}>Pháp luật</h3>
            <h2 className={styles.titleNews}>
              <a href="javascript:void(0);">
                Tài xế xe đầu kéo vi phạm nồng độ cồn, đâm vào nhà dân
              </a>
            </h2>
            <div className={styles.introNews}>
              Lái xe đầu kéo có nồng độ cồn 0,5 mg/lít khí thở, đâm vào nhà dân bên đường khiến một
              người chết, một người nguy kịch, 5 người bị thương.
            </div>
          </div>
        </div>
        <div className={styles.itemNews}>
          <a href="javascript:void(0);">
            <img src="/kinh-te-3.jpg" className={styles.itemImg} width={350} />
          </a>
          <div className={styles.itemInfo}>
            <h3 className={styles.titleCategory}>Pháp luật</h3>
            <h2 className={styles.titleNews}>
              <a href="javascript:void(0);">
                Tài xế xe đầu kéo vi phạm nồng độ cồn, đâm vào nhà dân
              </a>
            </h2>
            <div className={styles.introNews}>
              Lái xe đầu kéo có nồng độ cồn 0,5 mg/lít khí thở, đâm vào nhà dân bên đường khiến một
              người chết, một người nguy kịch, 5 người bị thương.
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pagination}>
        <button className={styles.page}>1</button>
        <button className={styles.page}>2</button>
        <button className={styles.page}>3</button>
        <button className={styles.page}>4</button>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
