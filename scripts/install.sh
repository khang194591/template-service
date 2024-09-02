read -r -p "Enter service name: " service_name
read -r -p "Do you want to install dependencies after cloning? (y/n): " install_now

# Clone the repository
git clone https://github.com/khang194591/template-service.git "${service_name}-service" && \
cd "${service_name}-service" || exit

# Update package.json
sed -i'' -e "s/\"name\": \"template-service\"/\"name\": \"${service_name}-service\"/" package.json

# Update DATABASE_NAME in .env.sample and .env.test
new_database_name=$(echo "${service_name}" | tr - _)
sed -i'' -e "s/DATABASE_NAME=template_service/DATABASE_NAME=${new_database_name}_service/" .env.sample
sed -i'' -e "s/DATABASE_NAME=template_service_test/DATABASE_NAME=${new_database_name}_service_test/" .env.test

# Optionally install dependencies
if [[ "$install_now" =~ ^[Yy]$ ]]; then
    yarn install
else
    echo "You can install dependencies later by running 'yarn install' inside the ${service_name}-service directory."
fi
