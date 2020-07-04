output=`curl http://checkip.amazonaws.com | head -n 1`
echo $output;
output=$(curl http://checkip.amazonaws.com | head -n 1)
sed -i "s/PUBLIC_DNS_PLACEHOLDER/$output/g" "/home/yard-rent/client/src/app/shared/utils.ts"
sed -i "s/PUBLIC_DNS_PLACEHOLDER/$output/g" "/home/yard-rent/client/src/app/shell/footer/online-users/online-users.component.ts"
