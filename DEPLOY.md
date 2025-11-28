# GitHub 배포 가이드

이 가이드는 GitHub Pages를 사용하여 포트폴리오 웹사이트를 배포하는 방법을 설명합니다.

## 1단계: GitHub 저장소 생성

1. GitHub 웹사이트(https://github.com)에 로그인합니다.
2. 우측 상단의 "+" 버튼을 클릭하고 "New repository"를 선택합니다.
3. 저장소 설정:
   - **Repository name**: `chako_portfolio` (또는 원하는 이름)
   - **Description**: "유빈이의 포폴 웹사이트" (또는 원하는 설명)
   - **Visibility**: **Public** 선택 (GitHub Pages 무료 사용을 위해 필요)
   - **Add README**: 체크 해제 (이미 README.md가 있음)
   - **Add .gitignore**: 선택 안 함
   - **Choose a license**: 선택 안 함
4. "Create repository" 버튼을 클릭합니다.

## 2단계: 로컬 저장소를 GitHub에 연결

터미널에서 다음 명령어를 실행하세요:

```bash
# GitHub 저장소 URL을 원격 저장소로 추가
git remote add origin https://github.com/whafac/chako_portfolio.git

# 기본 브랜치를 main으로 설정 (이미 main인 경우 생략 가능)
git branch -M main

# GitHub에 코드 푸시
git push -u origin main
```

**참고**: `whafac`를 본인의 GitHub 사용자명으로 변경하세요.

## 3단계: GitHub Pages 설정

1. GitHub 저장소 페이지로 이동합니다.
2. 상단 메뉴에서 **Settings** 탭을 클릭합니다.
3. 왼쪽 사이드바에서 **Pages**를 클릭합니다.
4. **Source** 섹션에서:
   - **Branch**: `main` 선택
   - **Folder**: `/ (root)` 선택
5. **Save** 버튼을 클릭합니다.

## 4단계: 배포 확인

1. 몇 분 정도 기다립니다 (최대 5-10분).
2. 저장소의 **Settings > Pages** 섹션으로 다시 이동합니다.
3. "Your site is live at" 메시지 아래에 웹사이트 URL이 표시됩니다.
   - 형식: `https://whafac.github.io/chako_portfolio/`
4. 해당 URL을 클릭하여 웹사이트가 정상적으로 작동하는지 확인합니다.

## 업데이트 방법

웹사이트를 업데이트하려면:

```bash
# 변경사항 추가
git add .

# 커밋
git commit -m "업데이트 내용 설명"

# GitHub에 푸시
git push
```

푸시 후 몇 분이 지나면 변경사항이 자동으로 반영됩니다.

## 문제 해결

### 웹사이트가 표시되지 않는 경우
- GitHub Pages 배포가 완료될 때까지 5-10분 정도 기다려보세요.
- Settings > Pages에서 배포 상태를 확인하세요.
- Actions 탭에서 배포 로그를 확인할 수 있습니다.

### CSS나 JavaScript가 작동하지 않는 경우
- 파일 경로가 올바른지 확인하세요 (대소문자 구분).
- 브라우저 캐시를 지우고 다시 시도해보세요.

## 커스텀 도메인 사용 (선택사항)

자신의 도메인을 사용하고 싶다면:
1. Settings > Pages > Custom domain에 도메인을 입력합니다.
2. 도메인 제공업체에서 DNS 설정을 완료합니다.

